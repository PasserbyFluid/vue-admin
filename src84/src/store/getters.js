const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  todolist: state => state.app.todolist,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name
}
export default getters
