import json

with open('/Users/shreyash/.gemini/antigravity-ide/brain/833ce57f-ae6a-49bd-a2d4-e0dc5db97b2f/scratch/parsed_summary.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

print(f"Total Sections: {data['sections_count']}")
print("="*60)

for idx, sec in enumerate(data['sections']):
    print(f"Section {idx+1}: ID={sec['id']}, Type={sec['type']}, Classes={sec['classes']}")
    
    # Collect texts in this section
    sec_texts = []
    for t in data.get('texts_sample', []):
        if t.get('section') == sec['id']:
            sec_texts.append(t['text'])
            
    # Also collect element texts
    for elem in sec.get('elements', []):
        if elem.get('text'):
            sec_texts.append(f"[{elem['type']}] {elem['text']}")
        elif elem.get('image'):
            sec_texts.append(f"[image] original={elem['image']['original']}")
            
    if sec_texts:
        print("  Contents:")
        for txt in sec_texts[:15]:
            print(f"    - {txt}")
        if len(sec_texts) > 15:
            print(f"    - ... and {len(sec_texts) - 15} more items")
    else:
        print("  (No content found)")
    print("-"*60)
