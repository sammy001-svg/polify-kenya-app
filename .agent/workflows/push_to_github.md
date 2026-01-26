---
description: Push the current project to a new GitHub repository
---

This workflow helps you push your code to GitHub.

1.  **Check Git Status**

    ```powershell
    git status
    ```

2.  **Add Remote Origin**
    Replace `YOUR_REPO_URL` with your actual GitHub repository URL.

    ```powershell
    git remote add origin YOUR_REPO_URL
    ```

3.  **Push to GitHub**
    ```powershell
    git branch -M main
    git push -u origin main
    ```
