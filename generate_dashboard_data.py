import csv
import json

# Read CSV data
data = []
with open('HERDMind_Session_Plans.csv', 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    for row in reader:
        data.append(row)

# Get unique values
categories = sorted(set([r['client_category'] for r in data if r.get('client_category')]))
themes = sorted(set([r['session_theme'] for r in data if r.get('session_theme')]))
props = sorted(set([r['prop_type'] for r in data if r.get('prop_type')]))

# Create mapping of combinations to plans
combo_to_plans = {}
for row in data:
    key = (
        row.get('client_category', ''),
        row.get('session_theme', ''),
        row.get('prop_type', '')
    )
    if key not in combo_to_plans:
        combo_to_plans[key] = []
    combo_to_plans[key].append({
        'id': row.get('id', ''),
        'name': row.get('session_plan_name', ''),
        'description': row.get('short_description', ''),
        'focus': row.get('specific_focus', '')
    })

# Generate all 100 combinations
all_combinations = []
row_num = 1

for category in categories:
    for theme in themes:
        for prop in props:
            key = (category, theme, prop)
            has_plan = key in combo_to_plans
            plans = combo_to_plans.get(key, [])
            
            # Generate placeholder name if no plan exists
            if not has_plan:
                placeholder_name = f"Plan {row_num} - {category} × {theme} × {prop[:30]}..."
            else:
                # Use first plan name, or combine if multiple
                if len(plans) == 1:
                    placeholder_name = plans[0]['name']
                else:
                    placeholder_name = f"{plans[0]['name']} (+{len(plans)-1} more)"
            
            all_combinations.append({
                'row': row_num,
                'category': category,
                'theme': theme,
                'props': prop,
                'hasPlan': has_plan,
                'planName': placeholder_name,
                'plans': plans,
                'count': len(plans)
            })
            row_num += 1

# Create summary stats
existing_count = sum(1 for c in all_combinations if c['hasPlan'])
missing_count = len(all_combinations) - existing_count

# Output JSON for JavaScript
dashboard_data = {
    'stats': {
        'total': len(all_combinations),
        'existing': existing_count,
        'missing': missing_count,
        'coverage': round((existing_count / len(all_combinations)) * 100, 1)
    },
    'categories': categories,
    'themes': themes,
    'props': props,
    'combinations': all_combinations
}

with open('dashboard_data.json', 'w', encoding='utf-8') as f:
    json.dump(dashboard_data, f, indent=2, ensure_ascii=False)

print(f"Generated dashboard data:")
print(f"  Total combinations: {len(all_combinations)}")
print(f"  Existing: {existing_count}")
print(f"  Missing: {missing_count}")
print(f"  Coverage: {dashboard_data['stats']['coverage']}%")
print(f"\nData saved to dashboard_data.json")

