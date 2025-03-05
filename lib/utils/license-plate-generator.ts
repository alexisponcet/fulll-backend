/**
 * A utility class for generating random license plate numbers.
 */
export class LicensePlateGenerator {
	static generatePlateNumber(): string {
		return `${this.generateRandomLetters(2)}-${this.generateRandomDigits(3)}-${this.generateRandomLetters(2)}`;
	}

	private static generateRandomLetters(length: number): string {
		let result = '';
		const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
		for (let i = 0; i < length; i++)
			result += characters.charAt(Math.floor(Math.random() * characters.length));
		return result;
	}

	private static generateRandomDigits(length: number): string {
		let result = '';
		const digits = '0123456789';
		for (let i = 0; i < length; i++)
			result += digits.charAt(Math.floor(Math.random() * digits.length));
		return result;
	}
}
