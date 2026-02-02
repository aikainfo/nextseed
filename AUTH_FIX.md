/**
 * AUTH FIX - handleComplete function
 * Replace lines 44-56 in register/page.tsx with this:
 */

const handleComplete = async () => {
    console.log("🔵 [UI] Submitting registration:", formData)

    try {
        // Call registration API
        const response = await fetch("/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ...formData,
                role,
            }),
        })

        const data = await response.json()

        if (data.success) {
            console.log("✅ [UI] Registration successful! Redirecting to:", data.redirectUrl)
            // Redirect to dashboard
            window.location.href = data.redirectUrl // Force full page reload to ensure cookies are set
        } else {
            console.error("❌ [UI] Registration failed:", data.error)
            alert("Ошибка регистрации: " + data.error)
        }
    } catch (error) {
        console.error("❌ [UI] Network error:", error)
        alert("Ошибка сети. Попробуйте снова.")
    }
}
