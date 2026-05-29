import re

with open('/Users/shreyash/.gemini/antigravity-ide/brain/833ce57f-ae6a-49bd-a2d4-e0dc5db97b2f/scratch/template6_full.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Let's find all hex colors
colors = re.findall(r'#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})', html)
unique_colors = set(colors)
print("Found Hex Colors:", sorted(list(unique_colors)))

# Let's inspect some class structures or key custom styles
print("\nSome inline styling samples:")
style_blocks = re.findall(r'<style>(.*?)</style>', html, re.DOTALL)
print(f"Total style blocks: {len(style_blocks)}")
for i, sb in enumerate(style_blocks[:3]):
    print(f"\nStyle block {i+1} (first 200 chars):")
    print(sb[:200] + "...")
