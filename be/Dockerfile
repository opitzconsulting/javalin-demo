FROM openjdk:11-jdk-slim as builder

RUN mkdir /build
COPY . /build
WORKDIR /build
RUN ./gradlew jar

FROM openjdk:11-jdk-slim

COPY --from=builder /build/build/libs/app.jar /app.jar
CMD ["java", "-jar", "/app.jar"]
