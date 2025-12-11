import csv
from collections import defaultdict

# Read the CSV
data = []
with open('HERDMind_Session_Plans.csv', 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    for row in reader:
        data.append(row)

print(f"Total session plans in CSV: {len(data)}\n")

# Get unique values for each dimension
client_categories = set()
session_themes = set()
prop_types = set()

for row in data:
    if row.get('client_category'):
        client_categories.add(row['client_category'])
    if row.get('session_theme'):
        session_themes.add(row['session_theme'])
    if row.get('prop_type'):
        prop_types.add(row['prop_type'])

print("=" * 80)
print("UI INPUT DIMENSIONS FROM HTML:")
print("=" * 80)

print("\n1. SCOPE OF PRACTICE (from HTML):")
print("   - Psychotherapy/Counseling Incorporating Equines")
print("   - Coaching/Education Incorporating Equines")
print("   (Note: This dimension is NOT in the CSV data)")

print("\n2. WHO IS THE SESSION FOR? (from HTML):")
print("   - Organizational Teams/Leaders")
print("   - Individuals")
print("   - Groups")
print("\n   Actual values in CSV (client_category):")
for cat in sorted(client_categories):
    print(f"   - {cat}")

print("\n3. WANT TO INCLUDE PROPS? (from HTML):")
print("   - Physical Tools (Pool noodles, cones, ground poles...)")
print("   - Natural Objects")
print("   - No Props")
print("\n   Actual values in CSV (prop_type):")
for prop in sorted(prop_types):
    print(f"   - {prop}")

print("\n4. GENERAL SESSION THEME? (from HTML):")
print("   - Exploring Identity & Belonging")
print("   - Leadership & Communication")
print("   - Boundaries & Safety")
print("\n   Actual values in CSV (session_theme):")
for theme in sorted(session_themes):
    print(f"   - {theme}")

# Calculate combinations
print("\n" + "=" * 80)
print("COMBINATION ANALYSIS:")
print("=" * 80)

# Count actual combinations in CSV
combos = defaultdict(int)
for row in data:
    key = (
        row.get('client_category', ''),
        row.get('session_theme', ''),
        row.get('prop_type', '')
    )
    combos[key] += 1

print(f"\nActual unique combinations in CSV: {len(combos)}")
print(f"Total session plans: {len(data)}")

# Theoretical combinations based on HTML UI
html_scope = 2  # Psychotherapy or Coaching
html_who = 3    # Teams, Individuals, Groups
html_props = 3  # Physical, Natural, None
html_theme = 3  # Identity, Leadership, Boundaries

theoretical_html = html_scope * html_who * html_props * html_theme
print(f"\nTheoretical combinations from HTML UI: {theoretical_html}")
print(f"  (Scope: {html_scope} × Who: {html_who} × Props: {html_props} × Theme: {html_theme})")

# Theoretical combinations based on actual CSV values
csv_who = len(client_categories)
csv_props = len(prop_types)
csv_theme = len(session_themes)

theoretical_csv = csv_who * csv_props * csv_theme
print(f"\nTheoretical combinations from CSV values: {theoretical_csv}")
print(f"  (Who: {csv_who} × Props: {csv_props} × Theme: {csv_theme})")

print(f"\nActual combinations in CSV: {len(combos)}")
print(f"Coverage: {len(combos)} / {theoretical_csv} = {len(combos)/theoretical_csv*100:.1f}% of possible combinations")

# Show breakdown by dimension
print("\n" + "=" * 80)
print("BREAKDOWN BY DIMENSION:")
print("=" * 80)

print(f"\nClient Categories ({csv_who} unique):")
for i, cat in enumerate(sorted(client_categories), 1):
    count = sum(1 for row in data if row.get('client_category') == cat)
    print(f"  {i}. {cat} ({count} sessions)")

print(f"\nSession Themes ({csv_theme} unique):")
for i, theme in enumerate(sorted(session_themes), 1):
    count = sum(1 for row in data if row.get('session_theme') == theme)
    print(f"  {i}. {theme} ({count} sessions)")

print(f"\nProp Types ({csv_props} unique):")
for i, prop in enumerate(sorted(prop_types), 1):
    count = sum(1 for row in data if row.get('prop_type') == prop)
    print(f"  {i}. {prop} ({count} sessions)")

# Show some actual combinations
print("\n" + "=" * 80)
print("SAMPLE ACTUAL COMBINATIONS IN CSV:")
print("=" * 80)
for i, (key, count) in enumerate(list(combos.items())[:15], 1):
    cat, theme, prop = key
    print(f"\n{i}. Count: {count}")
    print(f"   Category: {cat[:60] if cat else 'N/A'}")
    print(f"   Theme: {theme[:60] if theme else 'N/A'}")
    print(f"   Props: {prop[:60] if prop else 'N/A'}")

