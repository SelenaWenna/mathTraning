<template>
	<div class="alert alert-secondary buttons">
		<h3>Выберите уровень</h3>
		<button class="btn btn-success" v-for="(level, levelId) in settings.levels" @click="$emit('onStart', levelId)">
			{{ levelId }}
		</button>
		<button class="btn btn-success btn-esc"
				@click="$emit('toStartScreen')"
			>Выход</button>
		</div>
</template>

<script>
	export default {
		props: ['settings']
	}
</script>