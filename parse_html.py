import os
from html.parser import HTMLParser
import json

class WebPageParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tags_stack = []
        self.sections = []
        self.current_section = None
        self.images = []
        self.texts = []
        self.links = []
        self.styles = []
        
    def handle_starttag(self, tag, attrs):
        self.tags_stack.append(tag)
        attrs_dict = dict(attrs)
        
        # Identify Tilda blocks/records
        if tag == 'div' and 'class' in attrs_dict:
            classes = attrs_dict['class'].split()
            if 't-rec' in classes or 'r' in classes:
                if self.current_section:
                    self.sections.append(self.current_section)
                self.current_section = {
                    'id': attrs_dict.get('id', ''),
                    'type': attrs_dict.get('data-record-type', ''),
                    'classes': classes,
                    'elements': []
                }
        
        # Check for elements within the current section
        if self.current_section:
            if tag == 'div' and 'class' in attrs_dict:
                classes = attrs_dict['class'].split()
                if 't396__elem' in classes or 'tn-elem' in classes:
                    elem_id = attrs_dict.get('data-elem-id', '')
                    elem_type = attrs_dict.get('data-elem-type', '')
                    self.current_section['elements'].append({
                        'id': elem_id,
                        'type': elem_type,
                        'attrs': attrs_dict,
                        'text': ''
                    })
            
            # Record images
            if tag == 'img':
                src = attrs_dict.get('src', '')
                orig = attrs_dict.get('data-original', '')
                alt = attrs_dict.get('alt', '')
                img_data = {'src': src, 'original': orig, 'alt': alt, 'section': self.current_section['id']}
                self.images.append(img_data)
                if self.current_section['elements']:
                    self.current_section['elements'][-1]['image'] = img_data
                    
            # Record links
            if tag == 'a':
                href = attrs_dict.get('href', '')
                self.links.append({'href': href, 'section': self.current_section['id']})
                
    def handle_endtag(self, tag):
        if self.tags_stack:
            self.tags_stack.pop()
            
    def handle_data(self, data):
        text = data.strip()
        if not text:
            return
            
        # Ignore script and style content in general text collection
        if self.tags_stack and self.tags_stack[-1] in ['script', 'style']:
            return
            
        self.texts.append({
            'tag': self.tags_stack[-1] if self.tags_stack else '',
            'text': text,
            'section': self.current_section['id'] if self.current_section else 'root'
        })
        
        if self.current_section and self.current_section['elements']:
            last_elem = self.current_section['elements'][-1]
            if last_elem['type'] == 'text':
                last_elem['text'] += ' ' + text
                last_elem['text'] = last_elem['text'].strip()

# Create scratch directory if not exists
os.makedirs('/Users/shreyash/.gemini/antigravity-ide/brain/833ce57f-ae6a-49bd-a2d4-e0dc5db97b2f/scratch', exist_ok=True)

html_path = '/Users/shreyash/.gemini/antigravity-ide/brain/833ce57f-ae6a-49bd-a2d4-e0dc5db97b2f/scratch/template6_full.html'
with open(html_path, 'r', encoding='utf-8') as f:
    html_part = f.read()

parser = WebPageParser()
parser.feed(html_part)
if parser.current_section:
    parser.sections.append(parser.current_section)

summary = {
    'sections_count': len(parser.sections),
    'sections': parser.sections,
    'images': parser.images,
    'texts_sample': parser.texts[:100],
    'links': parser.links
}

output_path = '/Users/shreyash/.gemini/antigravity-ide/brain/833ce57f-ae6a-49bd-a2d4-e0dc5db97b2f/scratch/parsed_summary.json'
with open(output_path, 'w', encoding='utf-8') as f:
    json.dump(summary, f, indent=2)

print(f"Parsed {len(parser.sections)} sections, {len(parser.images)} images, and {len(parser.texts)} text blocks.")
