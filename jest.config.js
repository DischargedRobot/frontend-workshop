/** @type {import("jest").Config} */
module.exports = {
	preset: "ts-jest", // для ts
	testEnvironment: "node", // для fetc, таймеров и window, для documnet = jsdom
	moduleNameMapper: {
		"^@/(.*)$": "<rootDir>/$1",
	}, // для @/ чтобы понимал
	testPathIgnorePatterns: ["/node_modules/", "/.next/"], // для игнорирования поиска тестов в node_modules и .next
	modulePathIgnorePatterns: ["<rootDir>/.next/"], // для игнорирования поиска модулей в .next
	transform: {
		"^.+\\.tsx?$": [
			// тут \\ т.к. в js парсер использует \ как символ на указатель escape(т.е. он уберёт \ после парсинга) и нужно чтобы он передал в regex \
			"ts-jest",
			{
				tsconfig: "<rootDir>/tsconfig.jest.json",
			},
		],
	},
}
