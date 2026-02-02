# 🎓 Student Platform Implementation Plan

## 📋 Overview
Создание полноценной платформы для студентов с проектами, конкурсами и менторством.

---

## 🎯 Core Requirements

### 1. **Authentication & Database**
- ✅ Prisma schema уже готова
- ✅ Роли: student, mentor, business
- ✅ Better Auth интеграция
- 🔧 **TODO**: Обновить схему для новых полей проектов

### 2. **Projects Page** (`/student/projects`)
**Display:**
- Карточки проектов (Pinterest-style)
- Поиск и сортировка (популярность, новизна, рейтинг)
- Пагинация

**Project Card Fields:**
- Название
- Краткое описание
- Кнопка "Подробнее"

**Modal Window (2 вкладки):**

**Вкладка 1: О проекте**
- Полное описание
- Ссылки: Pitch Deck, Pitch Video, GitHub
- Стадия развития
- Участие в конкурсах/мероприятиях
- Ментор (если есть)
- Спонсоры/инвесторы
- Сумма инвестиций

**Вкладка 2: Отзывы и оценки**
- Звезды (1-5) от менторов/бизнес-аккаунтов
- Текстовые отзывы
- Только зарегистрированные mentor/business могут оценивать

### 3. **Competitions Page** (`/student/competitions`)
**Display:**
- Карточки конкурсов
- Кнопка "Участвовать"

**Modal Window:**
- Описание конкурса
- Правила участия (документ)
- Призы
- Дедлайн регистрации
- Форма регистрации:
  - **Для стартап-конкурсов**: контакты + выбор проекта
  - **Для олимпиад**: категория + имя + номер + email

**Features:**
- Автоматическое закрытие после дедлайна
- Модерация заявок (структурированные проекты)

### 4. **Outreach Page** (`/student/outreach`)
**Sections:**
- Менторы
- Инвесторы/Организации

**Functionality:**
- Связь через email или телефон (если указан)
- Выбор проекта для менторства/инвестиций
- Статусы запросов: отправлено/просмотрено/принято/отклонено

---

## 🎨 Design System

### Color Palette
```css
/* Primary - Turquoise/Teal Gradient */
--brand-50: #f0fdfa
--brand-100: #ccfbf1
--brand-200: #99f6e4
--brand-300: #5eead4
--brand-400: #2dd4bf
--brand-500: #14b8a6 /* Main */
--brand-600: #0d9488
--brand-700: #0f766e
--brand-800: #115e59
--brand-900: #134e4a

/* Accent - Blue */
--accent-50: #eff6ff
--accent-100: #dbeafe
--accent-200: #bfdbfe
--accent-300: #93c5fd
--accent-400: #60a5fa
--accent-500: #3b82f6 /* Main */
--accent-600: #2563eb
--accent-700: #1d4ed8
--accent-800: #1e40af
--accent-900: #1e3a8a

/* Gradients */
--gradient-primary: linear-gradient(135deg, #14b8a6 0%, #3b82f6 100%)
--gradient-card: linear-gradient(135deg, #f0fdfa 0%, #eff6ff 100%)
```

### Components Style
- Карточки: белый фон с тонкой тенью, hover эффект
- Модальные окна: backdrop blur, smooth animations
- Кнопки: градиенты, rounded-xl
- Inputs: border focus с brand цветом

---

## 📁 File Structure

```
src/
├── app/
│   └── (student)/
│       └── student/
│           ├── projects/
│           │   └── page.tsx          # Main projects page
│           ├── competitions/
│           │   └── page.tsx          # Competitions page
│           ├── outreach/
│           │   └── page.tsx          # Outreach page
│           └── layout.tsx            # Student layout
├── components/
│   ├── student/
│   │   ├── ProjectCard.tsx           # Project card component
│   │   ├── ProjectModal.tsx          # Project details modal
│   │   ├── CompetitionCard.tsx       # Competition card
│   │   ├── CompetitionModal.tsx      # Competition modal
│   │   ├── MentorCard.tsx            # Mentor card
│   │   ├── InvestorCard.tsx          # Investor card
│   │   └── OutreachForm.tsx          # Contact form
│   └── ui/
│       ├── modal.tsx                 # Base modal component
│       ├── tabs.tsx                  # Tabs component
│       └── rating.tsx                # Star rating component
└── lib/
    └── api/
        ├── projects.ts               # Project API calls
        ├── competitions.ts           # Competition API calls
        └── outreach.ts               # Outreach API calls
```

---

## 🔧 Implementation Steps

### Phase 1: Database Updates
1. ✅ Review current Prisma schema
2. 🔧 Add missing fields to Project model:
   - pitchDeckUrl
   - pitchVideoUrl
   - githubUrl
   - hasMentor (boolean)
   - mentorName
   - hasInvestors (boolean)
   - investorNames
   - participations (competitions/events)
3. 🔧 Add Competition model fields:
   - prizes
   - rulesDocument
   - category (startup/olympiad)
4. 🔧 Add Outreach/Contact model
5. 🔧 Run migration

### Phase 2: UI Components
1. Create base Modal component
2. Create Tabs component
3. Create Rating component
4. Create ProjectCard
5. Create CompetitionCard
6. Create MentorCard/InvestorCard

### Phase 3: Pages
1. Projects page with search/sort/pagination
2. Competitions page
3. Outreach page

### Phase 4: API Routes
1. GET /api/projects (with filters)
2. POST /api/projects (create)
3. POST /api/reviews (add review)
4. GET /api/competitions
5. POST /api/applications (apply to competition)
6. POST /api/outreach (contact mentor/investor)

### Phase 5: Seed Data
1. Create 5-10 template projects
2. Create 3-5 template competitions
3. Create 5 template mentors
4. Create 5 template investors/organizations

### Phase 6: Testing & Polish
1. Test all flows
2. Verify database connections
3. Check responsive design
4. Performance optimization

---

## 🚀 Next Actions

1. **Update Prisma Schema** - Add missing fields
2. **Run Migration** - Update database
3. **Create Seed File** - Template data
4. **Build UI Components** - Reusable components
5. **Implement Pages** - Student pages
6. **Test & Deploy** - Final checks

---

## ⚠️ Critical Notes

- ❌ NO template student accounts (only real registered users)
- ✅ Template projects/competitions/mentors/investors
- ✅ Real authentication with Neon database
- ✅ Moderation for competition applications
- ✅ Auto-close competitions after deadline
- ✅ Only mentor/business can rate projects
