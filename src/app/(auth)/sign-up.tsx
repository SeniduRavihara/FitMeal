import React, { useState } from 'react'
import { Alert, StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native'
import { supabase } from '../../lib/supabase'
import { router } from 'expo-router'

export default function SignUpScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function signUpWithEmail() {
    setLoading(true)
    console.log('Attempting to sign up with:', { email, password: '***' })
    
    const {
      data: { session, user },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    })
    
    console.log('Sign up response:', { session, user, error })
    
    if (error) {
      console.error('Sign up error:', error)
      Alert.alert('Error', error.message)
    } else if (user) {
      console.log('User created successfully:', user.id)
      Alert.alert('Success', 'Account created successfully!')
    }
    
    setLoading(false)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      
      <View style={styles.verticallySpaced}>
        <TextInput
          style={styles.input}
          placeholder="email@address.com"
          onChangeText={(text) => setEmail(text)}
          value={email}
          autoCapitalize={'none'}
        />
      </View>
      
      <View style={styles.verticallySpaced}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          autoCapitalize={'none'}
        />
      </View>
      
      <View style={styles.verticallySpaced}>
        <TouchableOpacity 
          style={[styles.button, loading && styles.buttonDisabled]} 
          disabled={loading} 
          onPress={() => signUpWithEmail()}
        >
          <Text style={styles.buttonText}>Sign up</Text>
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity 
        style={styles.linkButton}
        onPress={() => router.push('/(auth)/sign-in')}
      >
        <Text style={styles.linkText}>Already have an account? Sign in</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  linkButton: {
    alignItems: 'center',
    marginTop: 16,
  },
  linkText: {
    color: '#007AFF',
    fontSize: 14,
  },
})
