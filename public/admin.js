async function admin() {
    //retreieve a list of books from server
    const bookListResponse = await fetch('http://localhost:3001/listBooks');
    const bookList = await bookListResponse.json();

    //display list of book titles to admin
    //place text input next to each book title
    //give each text input a value, the quanitity of copies
    //place a submit button next to each text input
    //When the submit button is clicked, retrieve the quantity from the associated text input and save the updated quantity to the server.

    const ul = document.createElement('ul');

    bookList.forEach(book => {
        const li = document.createElement('li');
        li.textContent = book.title;

        const textInput = document.createElement('input');
        textInput.type = 'text';
        textInput.value = book.quantity;
        li.append(textInput);

        const button = document.createElement('input');
        button.type = 'button';
        button.value = 'Save';
        button.addEventListener('click', async() => {
            const updateBookResponse = await fetch('http://localhost:3001/updateBook', {
                method:'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: book.id,
                    quantity: textInput.value,
                }),
            });
        });
        li.append(button);

        ul.append(li);
    });

    const root = document.querySelector('#root');
    root.append(ul);
}

admin();