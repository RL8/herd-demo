# Screens Consolidation Roadmap

## Visual Category Map

```
📱 HERDMind App (242 Screens)
│
├─ 👥 Social / Community (73 screens) ⚠️ HIGH CONSOLIDATION OPPORTUNITY
│  │
│  ├─ Posts & Feeds (13 screens → 3 screens) 💡 -10 screens
│  │  ├─ All HERDMind Only Posts ────┐
│  │  ├─ All HERDSter Only Posts ────┼─→ Unified Feed with filters
│  │  ├─ Hidden Posts ───────────────┘
│  │  ├─ View HERDMind Post Comments ┐
│  │  ├─ View HERDster Post Comments ┴─→ Unified Post View
│  │  ├─ New Post (HERDMind Only) ───┐
│  │  └─ New Post (HERDsters) ────────┴─→ Unified Post Creator
│  │
│  ├─ Comments & Replies (8 screens → 2 screens) 💡 -6 screens
│  │  ├─ Parent Comments HERDMind ────┐
│  │  ├─ Parent Comments HERDMster ───┤
│  │  ├─ Child Comment HERDMind ──────┼─→ Unified Threaded Comments
│  │  ├─ Child Comment HERDMind 2 ────┤
│  │  ├─ Child Comment HERDster ──────┤
│  │  └─ Child Comment HERDster 2 ────┘
│  │
│  ├─ Profiles (4 screens → 1 screen) 💡 -3 screens
│  │  ├─ Social Profile HERDMind Comments ─┐
│  │  ├─ Social Profile HERDMind Posts ─────┤
│  │  ├─ Social Profile HERDSter Comments ──┼─→ Unified Profile with Tabs
│  │  └─ Social Profile HERDster Posts ─────┘
│  │
│  ├─ Moderation Actions (16 screens → 3 screens) 💡 -13 screens
│  │  │
│  │  ├─ Block (5 screens → 1) ─────────────────┐
│  │  │  ├─ Block User Confirmed               │
│  │  │  ├─ Block User HERDMind Comment        │
│  │  │  ├─ Block User HERDMind Post      ─────┼─→ Unified Block Modal
│  │  │  ├─ Block User HERDster Comment        │
│  │  │  └─ Block User HERDster Post      ─────┘
│  │  │
│  │  ├─ Delete (5 screens → 1) ───────────────┐
│  │  │  ├─ Delete HERDMind Comment            │
│  │  │  ├─ Delete HERDMind Post          ─────┼─→ Unified Delete Modal
│  │  │  ├─ Delete HERDster Comment            │
│  │  │  └─ Delete HERDster Post          ─────┘
│  │  │
│  │  └─ Report (6 screens → 1) ───────────────┐
│  │     ├─ Report Comment (HERDMind)          │
│  │     ├─ Report Comment (HERDster)          │
│  │     ├─ Report Post (HERDMind)        ─────┼─→ Unified Report Flow
│  │     ├─ Report Post (HERDster)             │
│  │     ├─ Report Submitted (HERDMind)        │
│  │     └─ Report Submitted HERDster     ─────┘
│  │
│  ├─ Bookmarks (2 screens → 1 screen) 💡 -1 screen
│  │  ├─ Bookmarks Feed ─────────────────┐
│  │  └─ Bookmarks Feed (HERDster) ──────┴─→ Unified Bookmarks
│  │
│  └─ Other (7 screens)
│     ├─ About HERDMind (not logged in) ─┐
│     ├─ About HERDMind® ────────────────┴─→ Conditional rendering
│     ├─ Build Your Network
│     ├─ HERDMind Community Topics
│     ├─ Hidden Replies ─────────────────┐
│     ├─ Hidden Replies to Replies ──────┴─→ Unified Hidden Content
│     └─ Blocked Users
│
├─ 🎮 Games & Interactive Flow (61 screens) ⚠️ OPPORTUNITY FOR DATA-DRIVEN ENGINE
│  │
│  ├─ Field Theory (31 screens)
│  │  ├─ Scenes 1-24 (24 screens) ──────────┐
│  │  └─ Endings A-G (7 screens) ───────────┼─→ Scene Engine + Data
│  │
│  ├─ Game Style 1 (5 screens)
│  │  ├─ Scene 1 (1 screen) ────────────────┤
│  │  └─ Endings A-D (4 screens) ───────────┤
│  │
│  ├─ Game Style 2 (25 screens)             │
│  │  ├─ Scenes 1-23 (23 screens) ──────────┼─→ Universal Game System
│  │  └─ Endings A-D (4 screens) ───────────┤
│  │
│  └─ Meta (2 screens)                      │
│     ├─ ChoicePoint Games ─────────────────┤
│     └─ Games for later release ───────────┘
│
├─ 💳 Subscriptions & Billing (21 screens) ⚠️ HIGH CONSOLIDATION OPPORTUNITY
│  │
│  ├─ Pricing Screens (9 screens → 2 screens) 💡 -7 screens
│  │  ├─ Annual Membership Pricing ───────────────┐
│  │  ├─ Annual Membership Pricing HERDGM ────────┤
│  │  ├─ Annual Membership Pricing HERDSG ────────┤
│  │  ├─ Annual Membership Pricing Release 2 ─────┼─→ Unified Pricing
│  │  ├─ Annual Membership Pricing Transition ────┤   (Annual/Monthly)
│  │  ├─ Monthly Membership Pricing ──────────────┤   with user type
│  │  ├─ Monthly Membership Pricing HERDGM ───────┤   & release flags
│  │  ├─ Monthly Membership Pricing HERDSG ───────┤
│  │  └─ Monthly Membership Pricing Release 2 ────┘
│  │
│  ├─ Upgrade Flow (3 screens → 1 screen) 💡 -2 screens
│  │  ├─ Upgrade Codes Modal ──────────────┐
│  │  ├─ Upgrade Prompt ────────────────────┼─→ Unified Upgrade Modal
│  │  └─ Upgrade Prompt Transition ─────────┘
│  │
│  └─ Other (9 screens)
│     ├─ Auto Renewal
│     ├─ Cancel Stripe Checkout
│     ├─ Cancel Subscription
│     ├─ Manage Subscription Modal
│     ├─ Payment Failed
│     ├─ Trial Ended Upgrade
│     └─ YOUR SUBSCRIPTION HAS ENDED
│
├─ 🔐 Authentication & Account (18 screens) ⚠️ MODERATE CONSOLIDATION
│  │
│  ├─ Sign Up (3 screens → 1 screen) 💡 -2 screens
│  │  ├─ Email Sign Up Release 1.0 ─────────┐
│  │  ├─ Sign Up Release 2 ───────────────────┼─→ Unified Sign Up
│  │  └─ Sign Up Release 1.0 ────────────────┘
│  │
│  ├─ Password Flow (3 screens → 2 screens) 💡 -1 screen
│  │  ├─ Change Password
│  │  ├─ Create Secure Password
│  │  ├─ Forgot Password Reset Catch ─────────┐
│  │  └─ Forgot Password Screen 3 ────────────┴─→ Multi-step form
│  │
│  ├─ IAPHUB Checks (2 screens → 1 screen) 💡 -1 screen
│  │  ├─ IAPHUB Check Subscription (Sign up) ┐
│  │  └─ IAPHUB Check Subscription Log in ────┴─→ Context parameter
│  │
│  └─ Other (7 screens)
│     ├─ Delete Account Confirmation
│     ├─ IAPHUB Restore
│     ├─ Log In
│     ├─ Log In Transition Screen
│     └─ Sign Up Transition
│
├─ 🏠 Home & Utilities (11 screens) ⚠️ HIGH CONSOLIDATION OPPORTUNITY
│  │
│  ├─ Platform Variants (4 screens → 1 screen) 💡 -3 screens
│  │  ├─ Home ─────────────────────────────┐
│  │  ├─ Home Android Version 0.23 ────────┤
│  │  ├─ Home Apple Version 0.0.23 ─────────┼─→ Responsive Home
│  │  └─ Home WPA ──────────────────────────┘
│  │
│  ├─ Log Updates (2 screens → 1 screen) 💡 -1 screen
│  │  ├─ Annual Log Update Screen ──────────┐
│  │  └─ Monthly Log Update Screen ─────────┴─→ Period parameter
│  │
│  └─ Other (5 screens)
│     ├─ Add Screen
│     ├─ For later Release
│     ├─ Interested in?
│     ├─ Loading Screen
│     ├─ Paid Feature Only
│     └─ panel-item-header-title
│
├─ 💬 Modals & Transitions (11 screens) ⚠️ HIGH CONSOLIDATION
│  │
│  ├─ Success States (3 screens → 1 screen) 💡 -2 screens
│  │  ├─ Restored Success ─────────────────┐
│  │  ├─ Restored Success Transition ──────┼─→ Reusable Success Modal
│  │  └─ Restored Success Transition 2 ────┘
│  │
│  ├─ IAPHUB Transitions (3 screens → 1) 💡 -2 screens
│  │  ├─ IAPHUB Check Transition Screen ───┐
│  │  ├─ IAPHUB Check Transition Screen 2 ─┼─→ State-based transition
│  │  └─ IAPHUB Check Transition Screen 3 ─┘
│  │
│  └─ Other (5 screens)
│     ├─ More Modal
│     ├─ Plan Limit Reached Modal
│     ├─ Plan Limit Reached Modal Transition
│     ├─ Success Modal
│     └─ Unblock Request Confirmation
│
├─ 📅 Session Plans & Meetings (9 screens) ✅ WELL ORGANIZED
│  │
│  ├─ Session Management (3 screens → 1 screen) 💡 -2 screens
│  │  ├─ Favorite Sessions ─────────────────┐
│  │  ├─ Favorite Session Plan Details ─────┼─→ Unified Favorites View
│  │  └─ Print Favorite Sessions ───────────┘
│  │
│  ├─ Session Ratings (2 screens → 1 screen) 💡 -1 screen
│  │  ├─ Session Ratings ────────────────────┐
│  │  └─ Session Ratings 2 ──────────────────┴─→ Single Rating Screen
│  │
│  ├─ Session Requests (2 screens → 1 screen) 💡 -1 screen
│  │  ├─ New Session Request ────────────────┐
│  │  └─ New Session Request 2 (1.2) ────────┴─→ Feature flag
│  │
│  └─ Other (2 screens)
│     ├─ Detailed Session Plan
│     └─ How To Use Session Plans
│
├─ 📚 Content Library / Media (9 screens) ⚠️ MINOR CONSOLIDATION
│  │
│  ├─ Video Screens (2 screens → 1 screen) 💡 -1 screen
│  │  ├─ Video Categories ──────────────────┐
│  │  └─ Video Categories (Release 2) ──────┴─→ Dynamic content
│  │
│  └─ Other (7 screens)
│     ├─ Articles Library Categories
│     ├─ Articles List
│     ├─ Pdf Generator
│     ├─ Video List
│     ├─ Video Viewer
│     └─ View Article
│
├─ 👤 Profiles & Settings (8 screens) ✅ WELL ORGANIZED
│  ├─ Edit Profile Info
│  ├─ Edit Profile Pic
│  ├─ HERD Affiliation (Profile Edit)
│  ├─ HERD Affiliation?
│  ├─ My Profile
│  └─ Small Print
│
├─ 💬 Chat & Messaging (6 screens) ⚠️ MINOR CONSOLIDATION
│  ├─ Chat Invitation
│  ├─ Chat Screen
│  ├─ ChatBot Conversation
│  ├─ Conversations List
│  ├─ Delete Chat Modal
│  ├─ Message Received
│  └─ New Chat Modal
│
├─ 📖 Onboarding & Help (6 screens) ⚠️ MINOR CONSOLIDATION
│  │
│  ├─ Community Screens (2 screens → 1 screen) 💡 -1 screen
│  │  ├─ Community Forum Guidelines ────────┐
│  │  └─ Community Forum Welcome Page new ──┴─→ Onboarding flow
│  │
│  └─ Other (4 screens)
│     ├─ Contact Us
│     ├─ How To Play ChoicePoints Games
│     ├─ How To Use Session Plans
│     └─ Scope of Practice
│
├─ 🔔 Notifications & Alerts (5 screens) ⚠️ CONSOLIDATION NEEDED
│  │
│  ├─ Notification Lists (3 screens → 1 screen) 💡 -2 screens
│  │  ├─ Notifications List ────────────────┐
│  │  ├─ Notifications List 2 ──────────────┼─→ Unified Notifications
│  │  └─ Notifications Routing Screen ──────┘
│  │
│  └─ Other (2 screens)
│     └─ News Alerts
│
├─ 🔧 Administration (1 screen) ✅ OK
│  └─ Blocked Users
│
├─ 💰 IAP / Platform Checks (1 screen) ✅ OK
│  └─ IAPHUB Check Error
│
└─ ❓ Uncategorized (5 screens) ⚠️ NEEDS CATEGORIZATION
   ├─ All Set Up
   ├─ Edit Topic
   ├─ Free Overview
   ├─ HERD Members Only Topics
   ├─ Request Result
   └─ Setup Step 1
```

---

## Consolidation Summary

### By Priority Level:

#### 🔴 **PHASE 1: Quick Wins** (35 screens removed)
| Action | Before | After | Saved |
|--------|--------|-------|-------|
| Membership pricing consolidation | 9 | 2 | -7 |
| Platform home screen merge | 4 | 1 | -3 |
| Success/transition modals | 6 | 2 | -4 |
| IAPHUB transitions | 3 | 1 | -2 |
| Notification lists | 3 | 1 | -2 |
| Video categories | 2 | 1 | -1 |
| Session ratings | 2 | 1 | -1 |
| Sign up screens | 3 | 1 | -2 |
| About screens | 2 | 1 | -1 |
| Bookmarks | 2 | 1 | -1 |
| Log updates | 2 | 1 | -1 |
| Community onboarding | 2 | 1 | -1 |
| Upgrade flow | 3 | 1 | -2 |
| Session requests | 2 | 1 | -1 |
| Favorite sessions | 3 | 1 | -2 |
| IAPHUB subscription checks | 2 | 1 | -1 |
| Hidden replies | 2 | 1 | -1 |
| Forgot password | 2 | 1 | -1 |

**Total Phase 1: -35 screens** ✅

---

#### 🟡 **PHASE 2: Moderate Refactoring** (35 screens removed)
| Action | Before | After | Saved |
|--------|--------|-------|-------|
| Unified block modals | 5 | 1 | -4 |
| Unified delete modals | 5 | 1 | -4 |
| Unified report flow | 6 | 2 | -4 |
| Social profiles with tabs | 4 | 1 | -3 |
| Post feeds with filters | 3 | 1 | -2 |
| New post screen | 2 | 1 | -1 |
| View post comments | 2 | 1 | -1 |
| Threaded comments | 8 | 2 | -6 |
| Edit screens | 3 | 2 | -1 |

**Total Phase 2: -26 screens** ✅

---

#### 🟢 **PHASE 3: Advanced Optimization** (22+ screens)
| Action | Approach | Potential Savings |
|--------|----------|-------------------|
| Game engine refactor | Data-driven scene system | ~20 screens |
| Reusable modal system | Component library | ~5 screens |
| Dynamic content rendering | CMS approach | ~5 screens |

**Total Phase 3: -30 screens** (estimated)

---

## Grand Total Reduction

```
Current State:     242 screens
After Phase 1:     207 screens (-35, -14.5%)
After Phase 2:     181 screens (-61, -25.2%)
After Phase 3:     ~150 screens (-92, -38.0%)
```

---

## Implementation Roadmap

### Week 1-2: Analysis & Planning
- [ ] Audit screen usage analytics
- [ ] Identify truly unused/obsolete screens
- [ ] Create component library foundation
- [ ] Design parameter schemas for unified screens

### Week 3-4: Phase 1 Quick Wins
- [ ] Consolidate membership pricing (9 → 2)
- [ ] Merge platform home screens (4 → 1)
- [ ] Unify success/transition modals
- [ ] Implement feature flags for release variants
- [ ] Merge notification screens
- [ ] Categorize uncategorized screens

### Week 5-6: Phase 2 Moderation System
- [ ] Design unified moderation modal component
- [ ] Implement block/delete/report consolidation
- [ ] Migrate social profile screens to tabs
- [ ] Unify post/comment screens with parameters

### Week 7-8: Phase 2 Feed System
- [ ] Create unified feed component
- [ ] Implement filter/context system
- [ ] Migrate all post feeds
- [ ] Refactor comment threading

### Week 9-10: Testing & Validation
- [ ] Regression testing
- [ ] User acceptance testing
- [ ] Performance testing
- [ ] Analytics validation

### Week 11-12: Phase 3 Planning
- [ ] Game engine architecture
- [ ] Design system finalization
- [ ] CMS integration planning

---

## Risk Mitigation

### High Risk Areas:
1. **Games System** - 61 screens is complex
   - Mitigation: Phase 3, extensive testing
   
2. **Social Features** - Core user experience
   - Mitigation: A/B test, gradual rollout
   
3. **Platform Variations** - Different app stores
   - Mitigation: Platform-specific testing

### Low Risk Areas:
1. **Pricing screens** - Backend-driven
2. **Modal consolidation** - UI-only changes
3. **Notification merge** - Simple logic

---

## Success Metrics

1. **Screen Count**: 242 → ~150 (-38%)
2. **Maintenance Time**: Track time to fix cross-platform bugs
3. **Development Velocity**: New feature implementation time
4. **Code Reusability**: % components used across multiple screens
5. **App Performance**: Load times, memory usage
6. **User Satisfaction**: NPS, retention rates

---

## Technical Debt Reduction

### Before Consolidation:
- 242 separate screens to maintain
- Duplicate logic across HERDMind/HERDster
- Platform-specific code duplication
- Version-based screen proliferation

### After Consolidation:
- ~150 screens with shared components
- Single codebase with context parameters
- Responsive design replacing platform variants
- Feature flags replacing version screens

**Estimated Maintenance Reduction: 35-40%**

---

## Next Steps

1. ✅ Review this analysis with stakeholders
2. ⏳ Prioritize consolidation efforts based on:
   - User impact
   - Technical complexity
   - Business value
3. ⏳ Begin Phase 1 implementation
4. ⏳ Set up analytics tracking
5. ⏳ Create component library foundation

