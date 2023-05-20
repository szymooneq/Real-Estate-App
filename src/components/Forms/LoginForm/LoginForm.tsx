import { LoginFormProps } from './LoginForm.types'

import * as Field from '../../Fields'
import Button from '../../UI/Button/Button'

const LoginForm = ({ control }: LoginFormProps) => {
	const { values, errors, touched, isValid, isSubmitting, handleChange, handleBlur, handleSubmit } =
		control

	return (
		<div className="mx-3 md:mx-auto md:w-96">
			<h2 className="p-5 text-3xl font-bold text-center dark:text-white">Logowanie</h2>

			<form onSubmit={handleSubmit}>
				<Field.Text
					name="email"
					label="Email"
					placeholder="Podaj adres e-mail..."
					value={values.email}
					errorMsg={errors.email}
					isTouched={touched.email}
					onChange={handleChange}
					onBlur={handleBlur}
				/>

				<Field.Text
					name="password"
					label="Hasło"
					placeholder="Podaj hasło..."
					value={values.password}
					errorMsg={errors.password}
					isTouched={touched.password}
					onChange={handleChange}
					onBlur={handleBlur}
				/>

				<div className="text-center">
					<Button
						type="submit"
						color="green"
						disabled={!isValid || isSubmitting}
						loadingMsg="Logowanie">
						Zaloguj
					</Button>
				</div>
			</form>
		</div>
	)
}

export default LoginForm
