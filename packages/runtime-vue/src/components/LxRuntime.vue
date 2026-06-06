<script setup lang="ts">
	import { h, resolveComponent } from 'vue';

	type SchemaNode = {
		component: string,
		props?: Record<string, unknown>,
		attributes?: Record<string, unknown>,
		slots?: Record<string, SchemaNode[]>,
	};

	const props = defineProps<{
		schema: SchemaNode,
	}>();

	const renderNode = (node: SchemaNode) => {
		const component = resolveComponent(node.component);

		const slots = Object.fromEntries(
			Object.entries(node.slots ?? {}).map(([slotName, children]) => [
				slotName,
				() => children.map(child => h(LxRuntime, {
					schema: child,
				})),
			]),
		);

		return h(component, {
			...node.attributes,
			...node.props,
		}, slots);
	};

	const LxRuntime = (runtimeProps: { schema: SchemaNode }) => renderNode(runtimeProps.schema);

	const RenderSchema = () => renderNode(props.schema);
</script>

<template>
	<RenderSchema />
</template>
