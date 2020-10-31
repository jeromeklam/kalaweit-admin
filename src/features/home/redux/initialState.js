const initialState = {
  loadAllFinish: false,
  loadAllPending: false,
  loadAllError: null,
  loadTimersPending: false,
  loadTimersError: null,
  socket: null,
  socketOn: false,
  socketConnected: false,
  socketMessage: null,
};

export default initialState;
