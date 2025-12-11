import csv
from collections import defaultdict

# Read the CSV
data = []
with open('HERDMind_Session_Plans.csv', 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    for row in reader:
        data.append(row)

# Get all unique values
client_categories = sorted(set([r['client_category'] for r in data if r.get('client_category')]))
session_themes = sorted(set([r['session_theme'] for r in data if r.get('session_theme')]))
prop_types = sorted(set([r['prop_type'] for r in data if r.get('prop_type')]))

# Count combinations
combos = defaultdict(list)
for row in data:
    key = (
        row.get('client_category', ''),
        row.get('session_theme', ''),
        row.get('prop_type', '')
    )
    combos[key].append({
        'id': row.get('id', ''),
        'name': row.get('session_plan_name', '')
    })

print("=" * 100)
print("COMPLETE BREAKDOWN OF ALL SESSION PLAN COMBINATIONS")
print("=" * 100)

print(f"\nTotal Session Plans: {len(data)}")
print(f"Unique Combinations: {len(combos)}\n")

# Group by category for better readability
for category in client_categories:
    print(f"\n{'='*100}")
    print(f"CLIENT CATEGORY: {category}")
    print(f"{'='*100}")
    
    category_combos = {k: v for k, v in combos.items() if k[0] == category}
    
    for theme in session_themes:
        theme_combos = {k: v for k, v in category_combos.items() if k[1] == theme}
        
        if theme_combos:
            print(f"\n  Theme: {theme}")
            print(f"  {'-'*96}")
            
            for (cat, thm, prop), sessions in sorted(theme_combos.items()):
                print(f"\n    Props: {prop}")
                print(f"    Number of session plans: {len(sessions)}")
                for session in sessions:
                    print(f"      - [{session['id']}] {session['name']}")

# Create a summary matrix
print("\n\n" + "=" * 100)
print("COMBINATION MATRIX SUMMARY")
print("=" * 100)
print("\nFormat: [Category] × [Theme] × [Props] = Count of Session Plans\n")

for category in client_categories:
    for theme in session_themes:
        for prop in prop_types:
            key = (category, theme, prop)
            if key in combos:
                count = len(combos[key])
                print(f"✓ {category[:40]:<40} × {theme[:35]:<35} × {prop[:20]:<20} = {count}")
            # Uncomment below to show missing combinations
            # else:
            #     print(f"✗ {category[:40]:<40} × {theme[:35]:<35} × {prop[:20]:<20} = 0")

print(f"\n\nTotal unique combinations with data: {len(combos)}")
print(f"Total possible combinations: {len(client_categories) * len(session_themes) * len(prop_types)}")
print(f"Missing combinations: {len(client_categories) * len(session_themes) * len(prop_types) - len(combos)}")

