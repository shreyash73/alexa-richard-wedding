with open('/Users/shreyash/.gemini/antigravity-ide/brain/833ce57f-ae6a-49bd-a2d4-e0dc5db97b2f/.system_generated/steps/4/content.md', 'r', encoding='utf-8') as f:
    text = f.read()

print("File total length:", len(text))
print("First 500 chars:")
print(text[:500])
print("\n" + "="*50 + "\n")
print("Last 1000 chars:")
print(text[-1000:])
