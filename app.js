'use strict';

var postArray = [
  {id: 1, name:"gor", bloodType:"Bee"},
  {id: 2, name:"swello", bloodType:"ehBee"}
];

//handles page state
var Content = React.createClass({
  getInitialState: function(){
    return {data:postArray, showPostForm: true};
  },
  update: function(post){
    postArray.push(post);
    return this.setState({data:postArray});
  },
  removePost:function(id){
    var data = postArray.filter((post) => {
      return post.id != id;
    })
    this.setState({data: data, showPostForm: true})
    postArray = data;
  },
  showEdit:function(props){
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
      <PostList data={this.state.data} onEditClick={this.showEdit} deletePost={this.removePost}></PostList>
      {this.state.showPostForm ? <PostForm onPostSubmit = {this.update}></PostForm> : null}
      </section>
    );
  }
});

//updates / deletes posts
var EditForm = React.createClass({
  getInitialState: function(){
    return {name:this.props.data.name, bloodType:this.props.data.bloodType}
  },
  handleSubmit: function(evt){
    evt.preventDefault()
    this.props.data.name = this.state.name
    this.props.data.bloodType = this.state.bloodType
    this.props.handleEdit()
  },
  editName: function(evt){
    this.setState({name: evt.target.value})
  },
  editBlood: function(evt){
    this.setState({bloodType: evt.target.value})
  },
  delete: function(evt){
    evt.preventDefault()
    this.props.deletePost(evt.target.id)
  },
  cancel: function(evt){
    evt.preventDefault()
    this.setState({name:this.props.data.name, bloodType:this.props.data.bloodType})
    this.props.handleEdit()
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
        <button id={this.props.data.id} onClick={this.delete}>Delete</button>
        <button onClick={this.cancel}>Cancel</button>
      </form>
    )
  }
})

//displays posts
var PostList = React.createClass({
  getInitialState: function(){
    return {showEdit: false, showPostForm: true}
  },
  handleClick: function(evt){
    var show = this.state.showEdit
    var showPost = this.state.showPostForm
    this.props.onEditClick(evt? evt.target.id :null)
    this.setState({showEdit:!show, showPostForm:!showPost})
  },
  handleDelete: function(id){
    var show = this.state.showEdit
    var showPost = this.state.showPostForm
    this.setState({showEdit:!show, showPostForm:!showPost})
    this.props.deletePost(id)
  },
  render: function(){
    var nodes = this.props.data.map((post) => {
      return (
        <div key={post.id}>
          <Post name = {post.name}>{post.bloodType}</Post>
          {this.state.showEdit ? <EditForm data={post} handleEdit={this.handleClick} deletePost={this.handleDelete}/> : null}
          {this.state.showPostForm ? <button id={post.id} onClick={this.handleClick} type="button">Edit</button> : null}
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
      <div id="post">
        <p>Name: {this.props.name}</p>
        <p>Blood Type: {this.props.children}</p>
      </div>
    )
  }
})


//saves new post
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
