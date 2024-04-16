# 1ST STAGE -> Building the solution
FROM node:18 AS builder

## Files
# Create workdir
WORKDIR /home/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

#Copy source code
COPY . .

## Build
RUN npm run build

# 2ND STAGE -> Running
FROM nginx:1.25.1 AS runner

# Copy nginx.conf file
COPY .docker/nginx.conf /etc/nginx/nginx.conf

# Copy the built app from previous stage
COPY --from=builder /home/app/build /usr/share/nginx/html

## Start
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]