# Этап 1: Сборка Backend
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# 1. Копируем только файл проекта для кэширования зависимостей
COPY ["src/DeliveryApp.Api/DeliveryApp.Api.csproj", "DeliveryApp.Api/"]
RUN dotnet restore "DeliveryApp.Api/DeliveryApp.Api.csproj"

# 2. Копируем ВЕСЬ исходный код API (включая Program.cs!) в правильную папку
COPY ["src/DeliveryApp.Api/", "DeliveryApp.Api/"]

WORKDIR "/src/DeliveryApp.Api"
RUN dotnet publish -c Release -o /app/publish

# Этап 2: Финальный образ для запуска
FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /app
COPY --from=build /app/publish .
EXPOSE 8080
ENV ASPNETCORE_URLS=http://+:8080
ENTRYPOINT ["dotnet", "DeliveryApp.Api.dll"]