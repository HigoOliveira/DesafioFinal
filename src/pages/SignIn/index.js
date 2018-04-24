/* Core */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* Redux */
import { connect } from 'react-redux';
import ActionCreators from 'store/ducks/user';

/* Presentational */
import { View } from 'react-native';
import Alert from 'components/Alert';
import Input from 'components/Input';
import Button from 'components/Button';
import Message from 'components/Message';

import styles from './styles';

class SignIn extends Component {
  propTypes = {
    login: PropTypes.func.isRequired,
    cellphone: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
    msg: PropTypes.string.isRequired,
  }
  state = {
    password: '',
  }

  validation = () => {
    const { password } = this.state;
    const { cellphone } = this.props;
    if (cellphone && password) {
      this.props.login(cellphone, password);
    } else {
      Alert.alert('Por favor entre com dados válidos para poder acessar.');
    }
  }

  number = () => {
    const { cellphone } = this.props;
    return cellphone.substring(3);
  }

  renderMessage = () => {
    if (this.props.msg) {
      return (
        <Message text={this.props.msg} />
      );
    }
    return null;
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderMessage()}
        <Input
          value={this.number()}
          type="cel-phone"
          icon="phone"
          placeholder="Seu número de telefone"
          ref={(ref) => { this.input = ref; }}
          editable={false}
        />
        <Input
          onChangeText={(password) => { this.setState({ password }); }}
          value={this.state.password}
          type="none"
          icon="lock"
          placeholder="Sua senha secreta"
          secureTextEntry
          ref={(ref) => { this.input = ref; }}
        />
        <Button
          title="Entrar"
          onPress={this.validation}
          loading={this.props.loading}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  cellphone: state.user.cellphone,
  loading: state.user.loading,
  msg: state.user.msg,
});

const mapDispatchToProps = dispatch => ({
  login: (username, password) => dispatch(ActionCreators.userLogin(username, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
