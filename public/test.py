import cloudinary
import cloudinary.uploader
import os

# ---- Step 1: Configure Cloudinary ----
cloudinary.config(
  cloud_name = "dicgr2srv",
  api_key = "532618882583427",
  api_secret = "18O7aPhJTLOZ-hr_Q4X2Ja-axk4"
)

# ---- Step 2: Folder to Upload ----
directory = "docs/frames"  # Update this if your chunks are elsewhere

# ---- Step 3: Upload all .bin and .json files ----
uploaded = {}

for filename in os.listdir(directory):
    if filename.endswith(".bin") or filename.endswith(".json"):
        filepath = os.path.join(directory, filename)
        try:
            response = cloudinary.uploader.upload(
                filepath,
                resource_type="raw",
                public_id=f"docs/frames/{filename}",  # Cloudinary folder + name
                use_filename=True,
                unique_filename=False,
                overwrite=True
            )
            uploaded[filename] = response["secure_url"]
            print(f"✅ Uploaded: {filename}")
        except Exception as e:
            print(f"❌ Failed: {filename} → {e}")

# ---- Step 4: Print all resulting URLs ----
print("\n📦 Uploaded files:")
for name, url in uploaded.items():
    print(f"{name}: {url}")