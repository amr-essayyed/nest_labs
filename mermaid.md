sequenceDiagram
    participant Client
    participant AuthController
    participant AuthService
    participant UsersService
    participant JwtService

    Client->>AuthController: POST auth/login { username, password }
    AuthController->>AuthService: authenticate({ username, password })
    AuthService->>UsersService: findByUsername(username)
    UsersService-->>AuthService: user
    AuthService->>JwtService: signAsync(tokenPayload)
    JwtService-->>AuthService: accessToken
    AuthService-->>AuthController: { accessToken, username, userId }
    AuthController-->>Client: accessToken, username, userId