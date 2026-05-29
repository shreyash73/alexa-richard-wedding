import re

with open('/Users/shreyash/.gemini/antigravity-ide/brain/833ce57f-ae6a-49bd-a2d4-e0dc5db97b2f/scratch/template6_full.html', 'r', encoding='utf-8') as f:
    html = f.read()

print("Searching for audio sources:")
audio_sources = re.findall(r'<audio[^>]*src=["\']([^"\']+)["\']|<source[^>]*src=["\']([^"\']+)["\'][^>]*type=["\']audio', html, re.IGNORECASE)
for src in audio_sources:
    print(src)

print("\nSearching for video sources:")
video_sources = re.findall(r'<video[^>]*src=["\']([^"\']+)["\']|<source[^>]*src=["\']([^"\']+)["\'][^>]*type=["\']video', html, re.IGNORECASE)
for src in video_sources:
    print(src)

print("\nSearching for stylesheet links:")
css_links = re.findall(r'<link[^>]*href=["\']([^"\']+\.css[^"\']*)["\']', html, re.IGNORECASE)
for link in css_links[:10]:
    print(link)

print("\nSearching for font configurations:")
fonts = re.findall(r'font-family:[^;\'"]+', html)
unique_fonts = set(fonts)
print(unique_fonts)
