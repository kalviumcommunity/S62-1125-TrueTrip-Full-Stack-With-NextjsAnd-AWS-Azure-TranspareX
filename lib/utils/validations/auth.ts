import { signupSchema, loginSchema } from '@/lib/schemas/authSchema';

export class AuthValidations {
  static validateSignup(data: unknown) {
    return signupSchema.parse(data);
  }

  static validateLogin(data: unknown) {
    return loginSchema.parse(data);
  }

  static sanitizeUserInput(input: any) {
    const sanitized = { ...input };
    
    // Remove confirmPassword field
    if (sanitized.confirmPassword) {
      delete sanitized.confirmPassword;
    }
    
    // Trim string fields
    Object.keys(sanitized).forEach(key => {
      if (typeof sanitized[key] === 'string') {
        sanitized[key] = sanitized[key].trim();
      }
    });
    
    return sanitized;
  }
}