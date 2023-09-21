import { useState } from 'react';
import { connect } from './react-redux2';

const addAction = {
  type: 'add'
}

const mapStateToProps = (state: { count: number }) => {
  return {
    count: state.count
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    addCount: () => {
      dispatch(addAction)
    }
  }
}

interface Props {
  count: number;
  addCount: () => void;
}

function App(props: Props): JSX.Element {
  const { count, addCount } = props;
  return (
    <div className="App">        
      { count }        
      <button onClick={ () => addCount() }>增加</button>      
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

