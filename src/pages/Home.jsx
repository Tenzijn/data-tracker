function Home() {
  const userData = JSON.parse(localStorage.getItem('user'));
  console.log(userData);
  return <div>Home</div>;
}

export default Home;
