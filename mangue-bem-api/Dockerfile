# 1ST STAGE -> Building the solution
FROM maven:3.8.4-openjdk-17 AS builder

## Files
# Create workdir
WORKDIR /home/app

# Copy source code & pom file
COPY ./pom.xml /home/app
COPY ./src /home/app/src

## Build
RUN mvn -B -ntp clean package


# 2ND STAGE -> Running
FROM openjdk:17-jdk AS runner
 
## Files
# Create workdir
WORKDIR /opt

# Copy jar from previous stage
COPY --from=builder /home/app/target/*.jar app.jar
COPY --from=builder /home/app/src/main/resources/db/migration /home/flyway/sql
ENV FLYWAY_LOCATIONS=filesystem:user/home/flyway/sql/

## Start
EXPOSE 8080
ENTRYPOINT ["java", "-Djava.awt.headless=true", "-Duser.timezone=GMT", "-jar", "app.jar"]