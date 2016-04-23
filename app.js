var postArray = [
  {id: 1, name:"gor", bloodType:"fuck this noise"}
];

var Content = React.createClass({
  getInitialState: function(){
    return {data:postArray};
  },
  update: function(post){
    postArray.push(post)
    return this.setState({data:postArray})
  },
  // polling: function(){
  //   setInterval(this.update, 1000)
  // },
  render: function(){
    return (
      <section id="postArray">
      <PostList data={this.state.data}></PostList>
      <PostForm onPostSubmit = {this.update}></PostForm>

      </section>
    );
  }
});

var EditForm = React.createClass({
  render: function(){
    return (
      <button type="button">Edit</button>
    )
  }
})

var PostList = React.createClass({
  render: function(){
    var nodes = this.props.data.map((post) => {
      return (
        <Post name = {post.name} key={post.id}>{post.bloodType}</Post>
      )
    })
    return (
      <div>
        {nodes}
      </div>
    )
  }
})

var Post = React.createClass({
  render: function(){
    return (
      <div>
        <p>{this.props.name}</p>
        <p>{this.props.children}</p>
        <EditForm></EditForm>
      </div>
    )
  }
})

var PostForm = React.createClass({
  getInitialState: function(){
    return {name:'', bloodType:''}
  },
  handleName: function(evt){
    this.setState({name: evt.target.value})
  },
  handleBlood: function(evt){
    this.setState({bloodType: evt.target.value})
  },
  handleSubmit: function(evt){
    evt.preventDefault();
    var name = this.state.name;
    var bloodType = this.state.bloodType;
    var newPost = {id: Date.now(), name: name, bloodType: bloodType}
    this.props.onPostSubmit(newPost)
    console.log(postArray)
    this.setState({name:'',bloodType:''})
  },
  render: function() {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="NAME"
          value={this.state.name}
          onChange={this.handleName}
        />
        <input
          type="text"
          placeholder="BLOOD TYPE"
          value={this.state.bloodType}
          onChange={this.handleBlood}
        />
        <button type="submit">S U B M I T</button>
      </form>
    );
  }
});

ReactDOM.render(
  <Content data={postArray}></Content>,
  document.getElementById('test')
)
