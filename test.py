import jwt
import time

SECRET_KEY = "SECR3T"

# Create a token (expires in 1 minute)
payload = {
    "username": "admin",
    "userid": "12345",
    "emailid": "admin@company.com",
    "exp": time.time() + 60  # expires in 60 seconds
}

token = jwt.encode(payload, SECRET_KEY, algorithm="HS256")
print("Generated Token:", token)

# Decode (verify) the token
try:
    decoded = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
    print("\nDecoded Payload:")
    for k, v in decoded.items():
        print(f"{k}: {v}")
except jwt.ExpiredSignatureError:
    print("❌ Token has expired")
except jwt.InvalidTokenError as err:
    print("❌ Invalid token:", err)
