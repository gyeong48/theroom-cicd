#build stage
FROM amazoncorretto:17.0.14-alpine AS builder

WORKDIR /app

COPY ./ ./

RUN chmod +x ./gradlew

RUN ./gradlew clean build -x test

#run stage
FROM amazoncorretto:17.0.14-al2023

WORKDIR /app

COPY --from=builder /app/build/libs/*.jar app.jar

EXPOSE 8080

CMD [ "java", "-jar", "app.jar" ]