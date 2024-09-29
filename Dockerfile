# Stage 1: Build Stage
FROM nginx:alpine

# Create a non-root user and group
RUN addgroup -S devopsg && adduser -S devopsu -G devopsg

# Remove the default Nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy your static files to the Nginx HTML directory
COPY --chown=devopsu:devopsg index.html /usr/share/nginx/html/
COPY --chown=devopsu:devopsg app.js /usr/share/nginx/html/
COPY --chown=devopsu:devopsg styles.css /usr/share/nginx/html/

# Change ownership of necessary directories for the non-root user
RUN chown -R devopsu:devopsg /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Add health check to ensure Nginx is running
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost/ || exit 1

# Start Nginx when the container launches
CMD ["nginx", "-g", "daemon off;"]
