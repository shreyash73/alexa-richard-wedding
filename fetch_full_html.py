import urllib.request
import ssl

url = 'https://webgency.tilda.ws/template6'
headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

# Bypass SSL verification if needed, tilda sometimes has certificate chain issues
ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

req = urllib.request.Request(url, headers=headers)
try:
    print("Fetching page...")
    with urllib.request.urlopen(req, context=ctx) as response:
        html = response.read().decode('utf-8')
        print(f"Success! Fetched {len(html)} bytes.")
        
        output_path = '/Users/shreyash/.gemini/antigravity-ide/brain/833ce57f-ae6a-49bd-a2d4-e0dc5db97b2f/scratch/template6_full.html'
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(html)
        print(f"Saved complete HTML to {output_path}")
except Exception as e:
    print(f"Error fetching: {e}")
