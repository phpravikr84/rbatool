# generate_hash.py
from passlib.hash import bcrypt

def make_hash(password: str):
    return bcrypt.hash(password)

if __name__ == "__main__":
    pwd = input("Enter password to hash: ")
    hashed = make_hash(pwd)
    print("\nGenerated bcrypt hash:\n")
    print(hashed)