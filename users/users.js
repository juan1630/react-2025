import axios from 'axios'

const getPosts = async() => {
   const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
   if(response.status === 200 ) {
    return response.data
   }
}

const getUsers = async()  => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users')
    if(response.status === 200) {
        return response.data
    }
}


const joinData = async () => {
  const postsResponse = await getPosts();

  const usersRespose = await getUsers();

// console.log(postsResponse[0])

  return postsResponse.map((post) => ({
    ...post,
    userId: usersRespose.find( user => user.id === post.userId ).name,
  }));
};


joinData().then( newPosts => console.log(newPosts) )
