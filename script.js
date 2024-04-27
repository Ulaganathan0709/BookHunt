document.getElementById('search-btn').addEventListener('click', function() {
    const searchInput = document.getElementById('search-input').value;
    searchBooks(searchInput);
});

// Function to handle book searching
function searchBooks(query) {
    const results = document.getElementById('results');
    results.innerHTML = '<div>Loading...</div>'; // Show loading text

    fetch(`https://gutendex.com/books?search=${encodeURIComponent(query)}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            displayResults(data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            results.textContent = 'Error fetching data. Please try again.';
        });
}

// Function to display search results or initial list
function displayResults(data) {
    const results = document.getElementById('results');
    results.innerHTML = ''; // Clear loading text or previous results

    if (data.results && data.results.length > 0) {
        data.results.forEach(book => {
            const resultItem = document.createElement('div');
            resultItem.textContent = `${book.title} by ${book.authors.map(author => author.name).join(', ')}`;
            resultItem.addEventListener('click', () => showDetails(book));
            results.appendChild(resultItem);
        });
    } else {
        results.textContent = 'No books found.';
    }
}

function showDetails(book) {
    const results = document.getElementById('results');
    results.innerHTML = `<div>
        <strong>Title:</strong> ${book.title}<br>
        <strong>Authors:</strong> ${book.authors.map(author => author.name).join(', ')}
        <br><strong>Published:</strong> ${book.publish_date || 'Not available'}
        <br><strong>Subjects:</strong> ${book.subjects.join(', ')}
        <br><strong>Bookshelves:</strong> ${book.bookshelves.join(', ') || 'Not specified'}
        <br><strong>Languages:</strong> ${book.languages.join(', ')}
        <br><strong>Download Count:</strong> ${book.download_count || 'Data not available'}
    </div>`;
}

// Initial fetch to populate the homepage with books when the page loads
document.addEventListener('DOMContentLoaded', function() {
    searchBooks(''); // Pass an empty string to fetch a default list of books
});
