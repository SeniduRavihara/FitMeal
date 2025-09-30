import React, { useState } from 'react'
import { Alert, StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native'
import { supabase } from '../../lib/supabase'
import { router } from 'expo-router'

export default function SignInScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function signInWithEmail() {
    setLoading(true)
    console.log('Attempting to sign in with:', { email, password: '***' })
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })
    
    console.log('Sign in response:', { data, error })
    
    if (error) {
      console.error('Sign in error:', error)
      Alert.alert('Error', error.message)
    } else if (data.user) {
      console.log('User signed in successfully:', data.user.id)
    }
    
    setLoading(false)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      
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
          onPress={() => signInWithEmail()}
        >
          <Text style={styles.buttonText}>Sign in</Text>
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity 
        style={styles.linkButton}
        onPress={() => router.push('/(auth)/sign-up')}
      >
        <Text style={styles.linkText}>Don't have an account? Sign up</Text>
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
