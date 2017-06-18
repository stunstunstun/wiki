---
title: Spring Boot에서 myBatis의 TypeHandler와 Enum 관리하기
date: 2016-09-12 15:14:40
desc: Spring Boot 레시피
categories: spring-boot
---

#### Overview

myBatis의 XML설정파일은 다양한 설정과 프로퍼티를 갖는데, 이 문서에서는 다양한 설정 중 TypeHandler 설정시 Enum 클래스를 관리해야하는 이슈를 설명하고 있다.

- myBatis에서 Enum 사용시 발생되는 이슈
- TypeHandler의 정의 및 리팩토링
- Spring Boot에서 TypeHandler의 등록

myBatis의 XML설정에 관련해서는 아래의 링크를 참조할수 있고, 이 문서에서는 Spring Boot으로 프로젝트를 생성하고, Java Config를 통해 관련 설정을 하였다.

> Mapper Configurations : https://mybatis.github.io/mybatis-3/ko/configuration.html


#### myBatis에서 Enum 사용시 발생되는 이슈

아래와 같은 PaymentMethodType 이라는 Enum 클래스가 있다고 가정하자.

```java
public enum PaymentMethodType {
 
    CREDIT("00", PayServiceType.GLOBAL), 
    PREPAID("01", PayServiceType.TH, PayServiceType.SG), 
    WALLET("02", PayServiceType.VN);
 
    private String code;
    private PayServiceType[] services;
 
    PaymentMethodType(String code, PayServiceType... services) {
        this.code = code;
        this.services = services;
    }
 
    public PayServiceType[] getServices() {
        return services;
    }
}
```

이 결제수단을 나타내는 Enum 클래스는 애플리케이션 개발시에는 아래와 같이 의미있는 모습으로 쓰여지길 원하지만,

Enum |	Desc
--|--
CREDIT | 신용카드
PREPAID	| 선불카드
WALLET | 전자지갑

REST API의 body에서 JSON Object 로 쓰여질때 또는 DB 에 데이터를 저장하고 조회할때에는 아래와 같이 코드성 값으로 관리해야 하는 요구사항이 있을수가 있다.

Enum | Value
--|--
CREDIT | 00
PREPAID	| 01
WALLET | 02

`JSON Object`

```
{
    "transactionNo": "2015100144948227287",
    "paymentMethod": "00",
    "amount": 1000,
    "currency": "KRW"
}
```

하지만, PaymentMethodType 과 같은 Enum 클래스에 아무런 조치를 취하지 않는다면, JSON Object와 DB에서는 Enum 클래스의 Value를 아래와 같이 인식을 하게 된다.

Enum | Value
--|--
CREDIT | CREDIT
PREPAID	| PREPAID
WALLET | WALLET

이는, JSON Object 에서 Object로 맵핑하거나 또는 DB 에서는 paymentMethod 를 DATA TYPE의 길이를 2로 정의했을때 오류가 발생하는 것을 쉽게 볼수 있을 것이다.


#### TypeHandler 의 정의 및 리팩토링

TypeHandler는 myBatis가 PreparedStatement에 파라미터를 설정하고 ResultSet 에서 값을 가져올때마다 적절한 자바 타입의 값을 가져오거나, INSERT시에 PreparedStatement에 적절한 자바 타입을 값을 set 할때 사용한다.

PaymentMethodType과 같은 Enum클래스를 예를들면, "CREDIT" 이라는 Value 대신에 "00" 이라는 VALUE가 INSERT / SELECT 되기를 기대하면 된다. TypeHandler에 대한 myBatis의 Reference는 아래의 링크를 참조하면 되며, 이 문서에서는 Enum을 위해 TypeHandler 클래스를 어떻게 정의하고 활용하는지 살펴보도록 하겠다.

> https://mybatis.github.io/mybatis-3/ko/configuration.html#typeHandlers

위와 같은 목적으로 클래스를 정의하기 위해서는 TypeHandler (org.apache.ibatis.type.TypeHandler) 인터페이스를 구현해야 한다.

```java
package org.apache.ibatis.type;
.....
public interface TypeHandler<T> {
 
  void setParameter(PreparedStatement ps, int i, T parameter, JdbcType jdbcType) throws SQLException;
 
  T getResult(ResultSet rs, String columnName) throws SQLException;
 
  T getResult(ResultSet rs, int columnIndex) throws SQLException;
 
  T getResult(CallableStatement cs, int columnIndex) throws SQLException;
 
}
```

필자는 위와 같은 이슈가 발생하는 Enum 클래스마다 TypeHandler 를 구현하는 것은 비효율적이기 때문에 아래와 같은 구조로 TypeHandler 클래스를 정의하였다.

`문자열인 코드를 반환하기 위한 인터페이스`

```java
public interface CodeEnum {
    public String getCode();
}
```

`TypeHandler를 구현한 CodeEnumTypeHandler 클래스`

```java
public abstract class CodeEnumTypeHandler <E extends Enum <E>> implements TypeHandler <CodeEnum> {
 
    private Class <E> type;
 
    public CodeEnumTypeHandler(Class <E> type) {
        this.type = type;
    }
 
    @Override
    public void setParameter(PreparedStatement ps, int i, CodeEnum parameter, JdbcType jdbcType) throws SQLException {
        ps.setString(i, parameter.getCode());
    }
 
    @Override
    public CodeEnum getResult(ResultSet rs, String columnName) throws SQLException {
        String code = rs.getString(columnName);
        return getCodeEnum(code);
    }
 
    @Override
    public CodeEnum getResult(ResultSet rs, int columnIndex) throws SQLException {
        String code = rs.getString(columnIndex);
        return getCodeEnum(code);
    }
 
    @Override
    public CodeEnum getResult(CallableStatement cs, int columnIndex) throws SQLException {
        String code = cs.getString(columnIndex);
        return getCodeEnum(code);
    }
 
    private CodeEnum getCodeEnum(String code) {
        try {
            CodeEnum[] enumConstants = (CodeEnum[]) type.getEnumConstants();
            for (CodeEnum codeNum: enumConstants) {           
                if (codeNum.getCode().equals(code) {
                    return codeNum;
                }
            }
            return null;
        } catch (Exception e) {
            throw new TypeException("Can't make enum object '" + type + "'", e);
        }
    }
}
```

`PaymentMethodType Enum`

최종적인 PaymentMethodType Enum 클래스는 다음과 같다. PaymentMethodType 과 같은 이슈를 가진 Enum 클래스 내부에 TypeHandler와 같은 static 클래스를 정의하며, 이 클래스는 CodeEnumTypeHandler 를 상속하여 공통적인 비지니스 로직을 처리하게 하였다.

```java
public enum PaymentMethodType implements CodeEnum {
 
    CREDIT("00", PayServiceType.GLOBAL), 
    PREPAID("01", PayServiceType.TH, PayServiceType.SG), 
    WALLET("02", PayServiceType.VN);
   
    private String code;
    private PayServiceType[] services;
 
    PaymentMethodType(String code, PayServiceType... services) {
        this.code = code;
        this.services = services;
    }
 
    public PayServiceType[] getServices() {
        return services;
    }
   
    @MappedTypes(PaymentMethodType.class)
    public static class TypeHandler extends CodeEnumTypeHandler<PaymentMethodType> {
        public TypeHandler() {
            super(PaymentMethodType.class);
        }
    }
     
    @Override
    @JsonValue
    public String getCode() {
        return code;
    }
}
```

> Java Config로 myBatis의 TypeHandler를 설정하기 위해서는 @MappedTypes(PaymentMethodType.class) 와 같이 명시적으로 정의해주어야 합니다.
 
#### Spring Boot에서 TypeHandler 등록

myBatis 설정시 SqlSessionFactoryBean 클래스에 아래와 같이 TypeHandler 등록이 가능하다. 이렇게 myBatis에서 Enum 클래스를 관리하는 방법을 알아보았고, 요구사항에 맞게 특정 코드성 값을 JSON Object 또는 DB 에서 사용할 수 있게 되었다.

```java
@Bean
public SqlSessionFactory sqlSessionFactoryBean(DataSource dataSource) throws Exception {
    SqlSessionFactoryBean sessionFactoryBean = new SqlSessionFactoryBean();
    sessionFactoryBean.setDataSource(dataSource);
    sessionFactoryBean.setTypeAliasesPackage(MyBatisProperties.TYPE_ALIASES_PACKAGE);
    sessionFactoryBean.setConfigLocation(applicationContext.getResource(myBatisProperties.getConfigLocation()));
    sessionFactoryBean.setMapperLocations(applicationContext.getResources(myBatisProperties.getMapperLocations()));
    sessionFactoryBean.setTypeHandlers(new TypeHandler[] {
        new BooleanTypeHandler(),
        new PaymentMethodCodeType.TypeHandler()
    });
 
    return sessionFactoryBean.getObject();
}
```



