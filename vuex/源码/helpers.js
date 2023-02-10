export const mapState = (arrList) => {
  let obj = {};
  
  for(let i = 0; i < arrList.length; i++) {
    let stateName = arrList[i];
    obj[stateName] = function() {
      return this.$store.state[stateName];
    }
  }

  return obj;
}


export const mapGetters = (arrList) => {
  let obj = {};
  
  for(let i = 0; i < arrList.length; i++) {
    let stateName = arrList[i];
    obj[stateName] = function() {
      return this.$store.getters[stateName];
    }
  }
  
  return obj;
}


export const mapMutations = (arrList) => {
  let obj = {};
  
  for(let i = 0; i < arrList.length; i++) {
    let stateName = arrList[i];
    obj[stateName] = function(payload) {
      return this.$store.commit(stateName, payload);
    }
  }
  
  return obj;
}


export const mapActions = (arrList) => {
  let obj = {};
  
  for(let i = 0; i < arrList.length; i++) {
    let stateName = arrList[i];
    obj[stateName] = function(payload) {
      return this.$store.dispatch(stateName, payload);
    }
  }
  
  return obj;
}