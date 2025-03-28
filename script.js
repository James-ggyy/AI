document.getElementById("edit-image").addEventListener("click", function() {
    // 點擊圖片隱藏圖片區，顯示編輯區
    document.getElementById("image-section").style.display = "none";
    document.getElementById("editor-section").style.display = "block";
});

document.getElementById("submit-btn").addEventListener("click", async function() {
    const title = document.getElementById("title-input").value;
    const essay = document.getElementById("essay-input").value;
    if (essay.trim() === "") {
        alert("Please write something before submitting!");
        return;
    }
    if (title.trim() === "") {
        alert("Please write something before submitting!");
        return;
    }

    // 發送 HTTP 請求到 Google Cloud API
    try {
        const response = await fetch("https://your-api-endpoint.com/revise-essay", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title:title,essay: essay })
        });

        const result = await response.json();

        if (response.ok) {
            // 顯示修改後的作文
            document.getElementById("revised-essay").textContent = result.revised_essay;
            document.getElementById("result-section").style.display = "block";
        } else {
            alert("Error: " + result.message);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while processing your request.");
    }
});