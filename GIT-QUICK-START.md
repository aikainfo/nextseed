# 🚀 Быстрая настройка Git для NextSeed

## ⚠️ ВАЖНО: Выполняйте команды в правильной папке!

**Правильная папка:** `c:\Users\ainen\.vscode\nextseed`
**НЕ:** `c:\Users\ainen\.vscode`

---

## Шаг 1: Настройка Git (один раз)

Замените на свои данные и выполните:

```bash
git config --global user.name "Ваше Имя"
git config --global user.email "ваш-email@example.com"
```

Пример:
```bash
git config --global user.name "Aika"
git config --global user.email "aika@example.com"
```

---

## Шаг 2: Перейти в папку проекта

```bash
cd c:\Users\ainen\.vscode\nextseed
```

---

## Шаг 3: Проверить статус Git

```bash
git status
```

Должно показать список измененных файлов.

---

## Шаг 4: Добавить удаленный репозиторий

```bash
git remote add origin https://github.com/aikainfo/nextseed.git
```

Если выдаст ошибку "remote origin already exists", сначала удалите старый:

```bash
git remote remove origin
git remote add origin https://github.com/aikainfo/nextseed.git
```

---

## Шаг 5: Проверить, что добавлено

```bash
git remote -v
```

Должно показать:
```
origin  https://github.com/aikainfo/nextseed.git (fetch)
origin  https://github.com/aikainfo/nextseed.git (push)
```

---

## Шаг 6: Добавить все файлы

```bash
git add .
```

---

## Шаг 7: Создать коммит

```bash
git commit -m "feat: initial commit - student platform implementation"
```

---

## Шаг 8: Переименовать ветку в main (если нужно)

```bash
git branch -M main
```

---

## Шаг 9: Отправить на GitHub

```bash
git push -u origin main
```

Если попросит логин/пароль:
- **Username:** aikainfo
- **Password:** используйте Personal Access Token (не обычный пароль!)

### Как получить Personal Access Token:
1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token
3. Выберите срок действия и права (repo)
4. Скопируйте токен и используйте вместо пароля

---

## ✅ Полная последовательность команд

Скопируйте и выполните по порядку (замените email и имя):

```bash
# 1. Настройка Git (один раз)
git config --global user.name "Ваше Имя"
git config --global user.email "ваш-email@example.com"

# 2. Перейти в папку проекта
cd c:\Users\ainen\.vscode\nextseed

# 3. Удалить старый origin (если есть)
git remote remove origin

# 4. Добавить новый origin
git remote add origin https://github.com/aikainfo/nextseed.git

# 5. Проверить
git remote -v

# 6. Добавить файлы
git add .

# 7. Коммит
git commit -m "feat: initial commit - student platform implementation"

# 8. Переименовать ветку
git branch -M main

# 9. Push
git push -u origin main
```

---

## 🚨 Если возникают ошибки

### Ошибка: "Author identity unknown"
```bash
git config --global user.email "ваш-email@example.com"
git config --global user.name "Ваше Имя"
```

### Ошибка: "remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/aikainfo/nextseed.git
```

### Ошибка: "src refspec main does not match any"
```bash
# Сначала создайте коммит
git add .
git commit -m "initial commit"
# Затем push
git push -u origin main
```

### Ошибка: "Authentication failed"
Используйте Personal Access Token вместо пароля (см. выше)

---

## 📝 После успешного push

Ваш код будет на GitHub: https://github.com/aikainfo/nextseed

Можете проверить в браузере!

---

**Готово! 🎉**
