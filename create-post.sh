#!/bin/bash

# Blog post creation script
echo "Creating new blog post..."

# Get post title
read -p "Enter post title: " title

# Get post date
read -p "Enter post date (e.g., 2024 Jan 20): " date

# Create filename from title
filename=$(echo "$title" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9]/-/g' | sed 's/-\+/-/g' | sed 's/^-\|-$//g')

# Create the HTML file
cat > "posts/$filename.html" << EOF
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>$title - Mitchell Portfolio</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inconsolata:wght@400;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../styles.css">
    <link rel="stylesheet" href="../post-styles.css">
</head>
<body>
    <div class="container">
        <nav class="back-nav">
            <a href="../index.html" class="back-link">← home</a>
        </nav>

        <main class="post-content">
            <header class="post-header">
                <h1 class="post-title">$title</h1>
                <time class="post-date">$date</time>
            </header>

            <article class="post-body">
                <p>Your content goes here...</p>
                
                <h2>Section Heading</h2>
                <p>More content...</p>
            </article>
        </main>
    </div>
</body>
</html>
EOF

echo "Created: posts/$filename.html"
echo ""
echo "Don't forget to add this to blog.html:"
echo "<article class=\"blog-entry\">"
echo "    <span class=\"date\">$date</span>"
echo "    <span class=\"separator\">-</span>"
echo "    <a href=\"posts/$filename.html\" class=\"title\">$title</a>"
echo "</article>" 