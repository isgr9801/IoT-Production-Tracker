#include <ESP8266WiFi.h>
#include <ESPAsyncWebServer.h>
#include <ArduinoJson.h>

const char* ssid = "Sagar Parab";
const char* password = "SwayambhU@9801";

// Production Tracking
bool isRunning = false;
uint16_t productionCount = 0;
unsigned long lastCountUpdate = 0;

AsyncWebServer server(89);

void setup() {
  Serial.begin(115200);
  delay(1000);
  
  WiFi.begin(ssid, password);
  while(WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  
  Serial.println("\nConnected!");
  Serial.print("IP: ");
  Serial.println(WiFi.localIP());

  server.on("/start", HTTP_POST, [](AsyncWebServerRequest *request){
    // Get the raw body content
    String countStr = request->arg("plain");
    
    if(countStr.length() > 0) {
      productionCount = countStr.toInt(); // Convert to integer
      isRunning = true;
      lastCountUpdate = millis();
      
      String response = "STARTED at count: " + String(productionCount);
      request->send(200, "text/plain", response);
      Serial.println(response);
    } else {
      request->send(400, "text/plain", "Send count as plain number (e.g. '10')");
    }
  });

  // Emergency Stop Endpoint (POST)
  server.on("/emergency_stop", HTTP_POST, [](AsyncWebServerRequest *request){
    isRunning = false;
    String response = "{\"status\":\"EMERGENCY_STOPPED\",\"count\":" + String(productionCount) + "}";
    request->send(200, "application/json", response);
    Serial.println("Emergency stop triggered");
  });

  // Status Endpoint (GET)
  server.on("/status", HTTP_GET, [](AsyncWebServerRequest *request){
    if(isRunning && millis() - lastCountUpdate >= 1000) {
      productionCount++;
      lastCountUpdate = millis();
    }
    
    String state = isRunning ? "RUNNING" : "STOPPED";
    String json = "{\"state\":\"" + state + "\",\"count\":" + String(productionCount) + "}";
    request->send(200, "application/json", json);
  });

  // Handle undefined routes
  server.onNotFound([](AsyncWebServerRequest *request){
    request->send(404, "text/plain", "Endpoint not found");
  });

  server.begin();
}

void loop() {
  // Auto-increment counter when running
  if(isRunning && millis() - lastCountUpdate >= 1000) {
    productionCount++;
    lastCountUpdate = millis();
    Serial.println("Current count: " + String(productionCount));
  }
}