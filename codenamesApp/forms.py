from django import forms

class SignInForm(forms.Form):
    first_name = forms.CharField(label='First name:', max_length=200)
    last_name = forms.CharField(label='Last name:', max_length=200)