import json
import re

# Read the JSON data
with open('dashboard_data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Convert to JavaScript object string
js_data = json.dumps(data, ensure_ascii=False, indent=8)

# Read the HTML file
with open('dashboard.html', 'r', encoding='utf-8') as f:
    html_content = f.read()

# Replace the placeholder
html_content = re.sub(
    r'const DASHBOARD_DATA_EMBEDDED = null; // Will be replaced by generate script',
    f'const DASHBOARD_DATA_EMBEDDED = {js_data};',
    html_content
)

# Write back
with open('dashboard.html', 'w', encoding='utf-8') as f:
    f.write(html_content)

print("✓ Embedded dashboard data into dashboard.html")
print("  The dashboard should now work when opened directly in a browser!")

