async function voteHandler(event) {
    event.preventDefault();

    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    const response = await fetch('/api/posts/votes', {
        method: 'PUT',
        body: JSON.stringify({
          post_id: post_id,
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if(response.ok) {
          document.location.reload();
          console.log(response) 
        } else {
            alert(`This is the response from the front end error ${response.statusText}`);
        }
}

$('#thumbs-up-post').on('click', voteHandler);
