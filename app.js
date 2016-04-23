var postArray = [
  {id: 1, name:"gor", bloodType:"Bee"},
  {id: 2, name:"swello", bloodType:"ehBee"}
];

var Content = React.createClass({
  getInitialState: function(){
    return {data:postArray, showPostForm: true};
  },
  update: function(post){
    postArray.push(post)
    return this.setState({data:postArray})
  },
  showEdit:function(props){
    console.log('hello')
    console.log(props)
    var singlePost = postArray.filter((post)=>{
      return post.id == props
    })
    var postForm = this.state.showPostForm
    if (this.state.data.length > 1) return this.setState({showPostForm: !postForm, data: singlePost})
    this.setState({showPostForm: !postForm, data: postArray})
  },
  render: function(){
    return (
      <section id="postArray">
      <PostList data={this.state.data} onEditClick={this.showEdit}></PostList>
      {this.state.showPostForm ? <PostForm onPostSubmit = {this.update}></PostForm> : null}
      </section>
    );
  }
});

var EditForm = React.createClass({
  getInitialState: function(){
    return {name:this.props.data.name, bloodType:this.props.data.bloodType}
  },
  handleSubmit: function(evt){
    evt.preventDefault()
    console.log(this.props)
  },
  editName: function(evt){
    this.setState({name: evt.target.value})
  },
  editBlood: function(evt){
    this.setState({bloodType: evt.target.value})
  },
  render: function(){
    return (
      <form className="editForm" onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder={this.props.data.name}
          value={this.state.name}
          onChange={this.editName}
        />
        <input
          type="text"
          placeholder="BLOOD TYPE"
          value={this.state.bloodType}
          onChange={this.editBlood}
        />
        <button type="submit">ED~IT</button>
      </form>
    )
  }
})

var PostList = React.createClass({
  getInitialState: function(){
    return {showEdit: false}
  },
  handleClick: function(evt){
    console.log(this.props)
    console.log('this is it',evt.target.id)
    var show = this.state.showEdit
    this.props.onEditClick(evt.target.id)
    this.setState({showEdit:!show})
    console.log(this.state)
  },
  render: function(){
    var nodes = this.props.data.map((post) => {
      return (
        <div key={post.id}>
          <Post name = {post.name}>{post.bloodType}</Post>
          {this.state.showEdit ? <EditForm data={post}/> : null}
          <button id={post.id} onClick={this.handleClick} type="button">Edit</button>
        </div>
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
