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


import styles from './styles';

class SignUp extends Component {
  static propTypes = {
    cellphone: PropTypes.string.isRequired,
    signUp: PropTypes.func.isRequired,
  }
  state = {
    cellphone: '',
    name: '',
    password: '',
  }

  validation = () => {
    const { cellphone, name, password } = this.state;
    if (cellphone && name && password) {
      this.props.signUp();
    } else {
      Alert.alert('Por favor entre com dados válidos para poder registrar.');
    }
  }

  number = () => {
    const { cellphone } = this.props;
    return cellphone.substring(3);
  }

  render() {
    return (
      <View style={styles.container}>
        <Input
          value={this.number()}
          type="cel-phone"
          icon="phone"
          placeholder="Seu número de telefone"
          ref={(ref) => { this.input = ref; }}
          editable={false}
        />
        <Input
          onChangeText={(name) => { this.setState({ name }); }}
          value={this.state.name}
          type="none"
          icon="user"
          placeholder="Nome completo"
        />
        <Input
          onChangeText={(password) => { this.setState({ password }); }}
          value={this.state.password}
          type="none"
          icon="lock"
          placeholder="Sua senha secreta"
          secureTextEntry
        />
        <Button title="Criar conta grátis" onPress={this.validation} />
        <Button title="Esqueci minha senha" onPress={() => {}} clean />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  cellphone: state.user.cellphone,
});

const mapDispatchToProps = dispatch => ({
  signUp: () => dispatch(ActionCreators.userSignUp()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
