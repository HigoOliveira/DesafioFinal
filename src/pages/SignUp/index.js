/* Core */
import React, { Component } from 'react';

/* Presentational */
import { View, Button } from 'react-native';

import { connect } from 'react-redux';

// import styles from './styles';

class SignUp extends Component {
  render() {
    return (
      <View>
        <Button title="Criar conta grátis" onPress={() => {}} />
      </View>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
